import unittest
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities

class TestBigramParser(unittest.TestCase):
    def setUpClass():
        print("Starting test cases")

    def setUp(self):
        chrome_options = webdriver.ChromeOptions()
        #chrome_options.add_argument("--headless=new")  # Enable headless mode
        self.driver = webdriver.Chrome(options=chrome_options)
        self.vars = {}


    def test_bigram_parser_no_words(self):
        words=""
        expectedHtml="Please input something above."
        self.driver.get("https://ayres-net.com/bigramParser")
        self.driver.set_window_size(1728, 994)
        time.sleep(1)
        self.driver.find_element(By.ID, "largeInput").click()
        self.driver.find_element(By.ID, "largeInput").send_keys(words)
        self.driver.find_element(By.ID, "processInput").click()

        child_text = self.driver.find_element(By.ID, "outputField").text

        self.assertEqual(child_text, expectedHtml, "test_bigram_parser_no_words: Results has the wrong value.")

        print("test_bigram_parser_no_words Success")

    def test_bigram_parser_one_word(self):
        words="hello"
        expectedHtml="Your string must include more than one word."
        self.driver.get("https://ayres-net.com/bigramParser")
        self.driver.set_window_size(1728, 994)
        time.sleep(1)
        self.driver.find_element(By.ID, "largeInput").click()
        self.driver.find_element(By.ID, "largeInput").send_keys(words)
        self.driver.find_element(By.ID, "processInput").click()

        child_text = self.driver.find_element(By.ID, "outputField").text

        self.assertEqual(child_text, expectedHtml, "test_bigram_parser_one_word: Results has the wrong value.")

        print("test_bigram_parser_one_word Success")

    def test_bigram_parser_two_words(self):
        words="hello world"
        expectedHtml="Bigram Count\nhello world 1"
        self.driver.get("https://ayres-net.com/bigramParser")
        self.driver.set_window_size(1728, 994)
        time.sleep(1)
        self.driver.find_element(By.ID, "largeInput").click()
        self.driver.find_element(By.ID, "largeInput").send_keys(words)
        self.driver.find_element(By.ID, "processInput").click()

        child_text = self.driver.find_element(By.ID, "outputField").text

        self.assertEqual(child_text, expectedHtml, "test_bigram_parser_two_words: Results has the wrong value.")

        print("test_bigram_parser_two_words Success")

    def test_bigram_parser_many_words(self):
        words="The quick brown fox and the quick blue hare."
        expectedHtml="Bigram Count\nthe quick 2\nquick brown 1\nbrown fox 1\nfox and 1\nand the 1\nquick blue 1\nblue hare 1"
        self.driver.get("https://ayres-net.com/bigramParser")
        self.driver.set_window_size(1728, 994)
        time.sleep(1)
        self.driver.find_element(By.ID, "largeInput").click()
        self.driver.find_element(By.ID, "largeInput").send_keys(words)
        self.driver.find_element(By.ID, "processInput").click()

        child_text = self.driver.find_element(By.ID, "outputField").text

        print("child_text")
        print(child_text)

        self.assertEqual(child_text, expectedHtml, "test_bigram_parser_many_words: Results has the wrong value.")

        print("test_bigram_parser_many_words Success")

    def test_bigram_parser_many_words_with_carriage_return(self):
        words="The quick brown fox and the\nquick blue hare."
        expectedHtml="Bigram Count\nthe quick 2\nquick brown 1\nbrown fox 1\nfox and 1\nand the 1\nquick blue 1\nblue hare 1"
        self.driver.get("https://ayres-net.com/bigramParser")
        self.driver.set_window_size(1728, 994)

        time.sleep(1)
        self.driver.find_element(By.ID, "largeInput").click()
        self.driver.find_element(By.ID, "largeInput").send_keys(words)
        self.driver.find_element(By.ID, "processInput").click()

        child_text = self.driver.find_element(By.ID, "outputField").text

        print("child_text")
        print(child_text)
        self.assertEqual(child_text, expectedHtml, "test_bigram_parser_many_words_with_carriage_return: Results has the wrong value.")

        print("test_bigram_parser_many_words_with_carriage_return Success")

    def test_bigram_parser_many_words_with_space_at_end(self):
            words="The quick brown fox and the\nquick blue hare. "
            expectedHtml="Bigram Count\nthe quick 2\nquick brown 1\nbrown fox 1\nfox and 1\nand the 1\nquick blue 1\nblue hare 1"
            self.driver.get("https://ayres-net.com/bigramParser")
            self.driver.set_window_size(1728, 994)
            time.sleep(1)
            self.driver.find_element(By.ID, "largeInput").click()
            self.driver.find_element(By.ID, "largeInput").send_keys(words)
            self.driver.find_element(By.ID, "processInput").click()

            child_text = self.driver.find_element(By.ID, "outputField").text

            print("child_text")
            print(child_text)
            self.assertEqual(child_text, expectedHtml, "test_bigram_parser_many_words_with_space_at_end: Results has the wrong value.")

            print("test_bigram_parser_many_words_with_space_at_end Success")


    def tearDown(self):
        self.driver.quit()


if __name__ == "__main__":
    unittest.main()
