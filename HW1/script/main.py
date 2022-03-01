import requests
from concurrent.futures import ThreadPoolExecutor


def get_url(url):
    return requests.get(url)


responses = []

for i in range(0, 5):
    with ThreadPoolExecutor(max_workers=10) as pool:
        responses += list(pool.map(get_url, ["http://localhost:5000/api/final"] * 10))

dict = {}
for response in responses:
   if response.status_code in dict:
       dict[response.status_code] += 1
   else:
       dict[response.status_code] = 1
print(responses)
max = 0
maxval = ""
for key in dict.keys():
    if max< dict[key]:
        max = dict[key]
        maxval = key
print("Most status response:" + str(maxval))
print("\n" + str(max) +" responses received")
