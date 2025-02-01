import requests
from bs4 import BeautifulSoup

def scrape_page(url, visited, max_depth, current_depth=0):
    if current_depth > max_depth or url in visited:
        return []

    visited.add(url)
    scraped_data = []

    try:
        response = requests.get(url, headers={"User-Agent": "Mozilla/5.0"})
        soup = BeautifulSoup(response.text, "html.parser")

        # Extract the title of the page
        title = soup.title.text if soup.title else "No Title"

        # Extract the entire content of the page
        body_content = soup.body.get_text(separator="\n") if soup.body else "No content available."
        body_content = "\n".join([line for line in body_content.split("\n") if line.strip() != ""])

        scraped_data.append({"title": title, "url": url, "content": body_content})

        # Find all links on the page
        links = [a['href'] for a in soup.find_all('a', href=True) if a['href'].startswith('http')]

        # Recursively scrape each link
        for link in links:
            scraped_data.extend(scrape_page(link, visited, max_depth, current_depth + 1))

    except Exception as e:
        print(f"Error scraping {url}: {e}")

    return scraped_data

# Example usage
start_url = "https://services.india.gov.in/?ln=en"
max_depth = 2  # Set the maximum depth for recursion
visited = set()
results = scrape_page(start_url, visited, max_depth)

with open("scraped_content.txt", "w", encoding="utf-8") as file:
    for result in results:
        file.write(f"Title: {result['title']}\nURL: {result['url']}\nContent:\n{result['content']}\n\n")