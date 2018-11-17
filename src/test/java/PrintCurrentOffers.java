import org.junit.Assert;

import org.junit.Assert;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;

public class PrintCurrentOffers {

    @org.junit.Test
    public void Test() {
        System.setProperty("webdriver.gecko.driver", "src\\main\\resources/geckodriver.exe");
        WebDriver driver = new FirefoxDriver();
        driver.get("https://www.olx.pl/");
        System.out.print("cos");
        driver.quit();
        Assert.assertTrue(false);
    }
}
