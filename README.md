# CSC173 - Interactive Design
Interactive design for CSC 173 with Dr Baynes

test-map.html will be our final submission, the other html files are for reference.

Hosted page: https://julianofhernandez.github.io/CSC173-Interactive/test-map.html

# Write-Up

  - A rationale for your design decisions. How did you choose your particular visual encodings and interaction techniques? What alternatives did you consider and how did you arrive at your ultimate choices?
  
  **For our interactive design we wanted to start off by replicating the interactive map that we had created in Tableau, but with new features so that it was more useful. Becuase of our past experience with this dataset and how unclean it is, we started off with writing a custom Python script that read  the businesses.json file, parsed it for all the businesses in Santa Barbara then output a parsed version to a new JSON file. yelp_filtered_to_santa_barbara.json is (3840/150346) = 0.03% of the lines that were in yelp_academic_dataset_business.json. After this we chose attributes, we needed to include latitude/longitude for it to be a map, then chose number of reviews and average rating as the two key factors that people would look for. For our interactive techniques we wanted sliders to control the review count and average stars. Most importantly, we wanted to include a search feature so that specific businesses could be compared by differenet locations. This would make it better than the last version where it was mostly static information.**
  
  - An overview of your development process. Describe how the work was split among the team members. Include a commentary on the development process, including answers to the following questions: Roughly how much time did you spend developing your application (in people-hours)? What aspects took the most time?
  
__Because we needed to coordinate with 4 people, Julian took on the role of setup and laying out the initial steps for everyone to work on. Together we identified what we wanted the final concept to look like, then Julian preprocessed the data, setup the tile layer with coordinates, and implemented the interactive zoom over about 7 hours. Next Kenta took over and replaced the dummy dataset with the processed JSON and linked the size to the number of reviews, this took him 5 hours of work. We ran into difficultly here because adding 1 to the radius of the circles increased the area by a lot more, together we decided to use radius=sqrt(review_count/pi) * 2, this adds 2 to the total area for each review. Next, Sam worked for 5 hours to add the last remaining attribute, color for average rating, and the search bar. Lastly, Abdallah completed the visualization by adding two sliders: one for color and one for size. We wanted these sliders to have two draggable elements so that we could sort by restaurants that fall between these two values. Unfortunetly, we ran into complications with D3 and Abdallah had already spent 10+ hours working hard, so we were okay with leaving them as specific value search.__

# Requirements
- [x] Preprocessing script @julian
  - Read the businesses.json file, parse it for all the businesses in Santa Barbara then output to a new JSON file. yelp_filtered_to_santa_barbara.json is (3840/150346) = 0.03% of the lines that were in yelp_academic_dataset_business.json. If you need the input file parsed better or changed let me know or if you are comfortable with python feel free to update ./yelpDatasetParser.py
- [x] Currently locations are plotted using a static list, we need to load the data from yelp_filtered_to_santa_barbara.json so that everyone else can start their tasks. @Kenta

- [x] 4 interactives ( include panning, zooming, brushing, details-on-demand (e.g., tooltips), dynamic query filters, and selecting different measures to display.)
  - [x] Slider: Filter by stars (give the user a slider between 0 and 5 for stars) @Abdallah
  - [x] Slider: Filter by total reviews (give the user a slider between 0 and the most reviewed restaurant) @Abdallah
  - [x] Search: Add a text input box that is used to filter by name (for example let me compare all "Starbucks" locations) @Sam
  - [x] Zoom: Add zooming functionality @Julian
  
- [x] Your chart must have at least 3 attributes. Attributes: 
  - [x] Size will be number of reviews @Kenta
  - [x] Color will be average rating @Sam
  - [x] Latitude and longitude for x and y and basemap coordinates @Julian

 - [x] Write up @Julian

# Setup

We will be using VSCode for running this project. First install Live Server using the extensions menu.

![image](https://user-images.githubusercontent.com/39971693/199818995-d84bfa44-e474-4a0e-a5e8-15cd93e22698.png)

Then right click test-map.html and Open With Live Server.

![image](https://user-images.githubusercontent.com/39971693/199819047-b473269a-d26f-4428-8123-84c70a8fb964.png)
 
 This will then open your browser and should be running the visualization.
 
![image](https://user-images.githubusercontent.com/39971693/200206211-94389134-208c-4e0f-954d-0b129a074a7d.png)

