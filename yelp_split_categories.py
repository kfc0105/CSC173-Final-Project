import json

def main():  
    with open('./yelp_filtered_to_reno.json', 'r+') as f:
        data = json.load(f)
        for index in data:
            if(index['categories'] != None):
                index['categories'] = index['categories'].split(",") 
        f.seek(0)
        json.dump(data, f, indent=4)
        f.truncate


if __name__ == '__main__':
    main()