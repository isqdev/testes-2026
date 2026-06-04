const { By, Builder, Browser, Key, until } = require("selenium-webdriver");

const URL = "https://www27.receita.fazenda.gov.br/simulador-irpf/";

const SELECTORS = {
  root: "calculo-mensal",
  year: 'mat-select[formcontrolname="anoCalendario"]',
  taxableIncome: 'input[formcontrolname="rendTributaveis"]',
};

const TAX_BRACKETS_2022 = [
  { from: 0, to: 1903.98, rate: 0 },
  { from: 1903.98, to: 2826.65, rate: 0.075 },
  { from: 2826.65, to: 3751.05, rate: 0.15 },
  { from: 3751.05, to: 4664.68, rate: 0.225 },
  { from: 4664.68, to: Infinity, rate: 0.275 },
];

function expectedTaxFor2022(taxableIncome) {
  const tax = TAX_BRACKETS_2022.reduce((total, bracket) => {
    const taxablePart = Math.min(taxableIncome, bracket.to) - bracket.from;

    return taxablePart > 0 ? total + taxablePart * bracket.rate : total;
  }, 0);

  return truncateCurrency(tax);
}

function truncateCurrency(value) {
  return Math.trunc((value + 1e-9) * 100) / 100;
}

function formatBrazilianCurrency(value) {
  return value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function currencyDigits(value) {
  return formatBrazilianCurrency(value).replace(/\D/g, "");
}

function parseBrazilianCurrency(value) {
  return Number(value.replace(/\./g, "").replace(",", "."));
}

async function selectMatOption(driver, selectCss, optionText) {
  await driver.findElement(By.css(selectCss)).click();

  const option = await driver.wait(
    until.elementLocated(
      By.xpath(`//mat-option//span[normalize-space()="${optionText}"]`)
    ),
    10000
  );

  await option.click();
  await driver.wait(
    until.elementTextContains(driver.findElement(By.css(selectCss)), optionText),
    10000
  );
}

async function fillCurrency(driver, css, value) {
  const input = await driver.findElement(By.css(css));

  await input.click();
  await input.sendKeys(Key.CONTROL, "a");
  await input.sendKeys(currencyDigits(value));
  await input.sendKeys(Key.TAB);
}

async function readValueAfterLabel(driver, labelPrefix) {
  const root = await driver.findElement(By.css(SELECTORS.root));
  const lines = (await root.getText())
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  const labelIndex = lines.findIndex((line) => line.startsWith(labelPrefix));

  if (labelIndex === -1) {
    throw new Error(`Label nao encontrado no simulador: ${labelPrefix}`);
  }

  return lines[labelIndex + 1];
}

async function fillIncomeAndWaitForBase(driver, taxableIncome) {
  await fillCurrency(driver, SELECTORS.taxableIncome, taxableIncome);

  await driver.wait(async () => {
    const displayedBase = await readValueAfterLabel(driver, "3. Base de cálculo");

    return parseBrazilianCurrency(displayedBase) === taxableIncome;
  }, 10000);
}

describe("Simulador IRPF 2022 - pagamento mensal do imposto de renda", () => {
  let driver;

  beforeAll(async () => {
    driver = await new Builder().forBrowser(Browser.CHROME).build();
    await driver.manage().setTimeouts({ implicit: 1000 });
    await driver.get(URL);
    await driver.wait(until.elementLocated(By.css(SELECTORS.year)), 20000);
    await selectMatOption(driver, SELECTORS.year, "2022");
  });

  afterAll(async () => {
    if (driver) {
      await driver.quit();
    }
  });

  const cases = [
    ["classe isenta abaixo do limite", 20000.00],
    ["valor limite superior da isencao", 1903.98],
    ["um centavo acima da isencao", 1903.99],
    ["valor limite da faixa de 7,5%", 2826.65],
    ["um centavo acima da faixa de 7,5%", 2826.66],
    ["valor limite da faixa de 15%", 3751.05],
    ["um centavo acima da faixa de 15%", 3751.06],
    ["valor limite da faixa de 22,5%", 4664.68],
    ["um centavo acima da faixa de 22,5%", 4664.69],
    ["representante da faixa maxima de 27,5%", 5000.0],
  ];

  test.each(cases)("%s: rendimento tributavel de R$ %p", async (_name, income) => {
    const expectedTax = expectedTaxFor2022(income);

    await fillIncomeAndWaitForBase(driver, income);

    const displayedBase = await readValueAfterLabel(driver, "3. Base de cálculo");
    const displayedTax = await readValueAfterLabel(driver, "4. Imposto");

    expect(displayedBase).toBe(formatBrazilianCurrency(income));
    expect(displayedTax).toBe(formatBrazilianCurrency(expectedTax));
  });
});
