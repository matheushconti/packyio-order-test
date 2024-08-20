import { test, expect } from "@playwright/test";

test("should navigate to the order page", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.click("text=Orders");
  await expect(page).toHaveURL("http://localhost:3000/orders");
  await expect(page.locator("h4")).toContainText("Orders");

  await page.click("text=Create Order");
  await expect(page).toHaveURL("http://localhost:3000/orders/create");

  await expect(page.locator("[name='loading']")).toHaveValue("false", {
    timeout: 2000,
  });

  // click the dropdown element to open list
  const selectDropdownLocator = page.locator(".ant-select-single");
  await selectDropdownLocator.click();
  const dropdownSelector = ".ant-select-dropdown";
  const dropdownLocator = page.locator(dropdownSelector);
  const dropdownListLocator = dropdownLocator.locator(".rc-virtual-list");
  await dropdownListLocator.waitFor({ state: "attached" });
  await dropdownListLocator.locator("[title='FE1']").click();
  const selectedLocator = selectDropdownLocator.locator(
    ".ant-select-selection-item"
  );
  await expect(selectedLocator).toHaveText("FE1");

  await page.locator("[name='number']").fill("playTest");
  await expect(page.locator("[name='number']")).toHaveValue("playTest");

  await page.getByRole('button', { name: 'Next' }).click();

  await expect(page.locator("[title='Name']")).toContainText("Name");

  await page.getByRole('button', { name: 'Next' }).click();

  await expect(page.locator("[title='Product']")).toContainText("Product");

});
