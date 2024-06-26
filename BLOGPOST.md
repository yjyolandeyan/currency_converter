# Introducing Our Chrome Extension: Currency Converter

In our recent software engineering class, we embarked on an exciting team project to develop a Chrome extension that addresses a common problem faced by many users: converting currencies while browsing the internet. We proudly present our Currency Converter extension, designed to provide real-time conversion rates with just a click of a button. Here’s a detailed overview of our project, including how to install and use it, and the problem it solves.

## Meet the Team
The Currency Converter extension is a collaborative effort by:
- **Tianyi Wu**
- **Yola Yan**
- **Ruth Tilahun**
- **Akanksha Tripathy**

## Why Did We Create This Extension?
The goal of our project was to create a Chrome extension that would provide real value to users. We brainstormed various ideas and ultimately decided on a tool that enhances the browsing experience by solving a common problem. Converting currencies manually can be inconvenient, time-consuming, and prone to errors. Our Chrome extension solves these issues by providing several key features designed to improve user experience:

1. **User-Friendly Interface**: Easy to navigate and use, ensuring a smooth experience for all users.
2. **Seamless Integration**: Fits neatly into the Chrome browser, allowing users to access its functionality without disrupting their browsing.
3. **Real-Time Functionality**: Delivers instant results and updates, providing users with the most current information they need.

We adopted agile methodologies, holding regular meetings to discuss progress and challenges. This approach ensured that everyone was on the same page and could contribute effectively.

## How to Install the Currency Converter Extension
1. **Download the Repository**: Download [the repository](https://github.com/yjyolandeyan/currency_converter) and unzip the file.
2. **Load the Extension in Chrome**:
   - Open Chrome and navigate to `chrome://extensions/`.
   - Click on "Load Unpacked" and select the unzipped currency-converter folder.
   - The Currency Converter extension should now appear under "All Extensions".
   - ![Extension Loaded](https://github.com/yjyolandeyan/currency_converter/assets/158221697/cf40b71a-e16d-4326-a906-fa7920177181)
3. **Pin the Extension**:
   - Click the puzzle icon in the top-right corner of the Chrome bar.
   - Pin the Currency Converter extension so its icon appears on the Chrome extension bar.
   - ![Pin Extension](https://github.com/yjyolandeyan/currency_converter/assets/158221697/973ad802-59e7-40d5-ba87-3065c2bd8a86)
4. **Using the Extension**:
   - Navigate to any webpage (e.g., Amazon).
   - Click the Currency Converter icon in the Chrome extensions bar.
   - Enter your "from currency" and "to currency" (both lowercase and uppercase are fine) and click "Submit".
   - The conversion ratio will appear below the "Submit" button, along with the range of prices on the page.
   - ![Conversion Interface](https://github.com/yjyolandeyan/currency_converter/assets/158221697/30f87247-1e98-47a0-b5e9-d27bf44f2d32)
5. **Highlight Prices**:
   - Highlight any numerical price on the webpage.
   - A popup box will appear with the converted price in the new currency.
   - ![Converted Price](https://github.com/yjyolandeyan/currency_converter/assets/158221697/c89e7377-c025-42fd-b786-d82c147058e5)

## Challenges and Learning
Throughout the project, we inevitably faced some challenges:
- **Technical Hurdles**: Some code worked well in testing but needed adjustments when integrated into the extension. 
- **Managing Data**: Storing and managing data across different parts of the extension was more complex than anticipated.
- **API Limitations**: We encountered restrictions on the number of requests we could make to the currency converter API, which also required user authentication.
- **Price Detection**: Detecting and converting prices on web pages had its difficulties, especially with varying formats and larger numbers.
- **Time Management**: Balancing this project with our other academic responsibilities and conflicting schedules was challenging.

Despite these challenges, we learned valuable lessons in teamwork, problem-solving, and software development. Each team member brought unique skills and perspectives, which enriched the project and helped us overcome obstacles.

Most of our members only had experience working on backend, so javascript was a completely new language for us. Starting with the Google chrome's extension tutorial such as "hello world": https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world was really helpful, since it teaches us how extensions are written, what are the main components of each chrome extension, and how should we test it. 

We highly recommend first divide the components of your project first and do not implement all parts together since it will make it extemely hard to test. For ours, we have API key access (fetch converstion rate), popup box with new price, and graph that shows the range of prices. Javascript has some limitations for sure, so make sure that instead of aiming to have the final expected output right away, you are actually printing out all the necessary information along the way to be able to test it out. 

While we first planned to convert all prices on the page automatically, we quickly realized a better solution that gives the user more option. We decided to have a little popup box on top of the price user highlights so that users can see the new price in the desired currency right away. Furthermore, we ended up adding a frequency graph in the chrome extension dropout so that users can have a very clear and straightforward sense of how the price of the product of interest distributes across the page. We also encounted some difficulties along the way: the graph did not display successfully when we used third-party libraries. To overcome this problem, we ended up drawing the graph using canvas.

In terms of addressing technical challenges, we learned that talking to AI such as ChatGPT and Claude is very helpful. Forming conversations with AI is an essential skill where you must be very patient in telling it what you are working on, what you have so far, and what you are asking their help with. It can be explanation of a code snippet that you do not understand, or it can be asking it to debug your code for you. Either way, disset the question into smaller pieces and then learning from the AI is very helpful to improve our learning along the way. 

## Future Plans
We are proud of what we have accomplished, but we also see room for improvement and expansion:
- **Improve UI and UX**: Enhance the user interface and user experience features to make the extension even more intuitive and visually appealing.
- **Additional Features**: We plan to add more features based on user feedback.
- **Optimization**: We aim to optimize the extension for better performance and user experience.
- **Wider Release**: We hope to make our extension available to a broader audience through the Chrome Web Store.

## Conclusion
Working on this Chrome extension was an incredible learning experience for all of us. It taught us the importance of collaboration, effective communication, and perseverance. We are excited to share our work with the world and look forward to hearing your feedback.

For more details and updates, visit our [project website](https://yjyolandeyan.github.io/currency_converter_deployed/).

## Special Thanks
We would like to extend a special thanks to [Professor Lumbroso](https://github.com/jlumbroso/) for his unwavering support and care for our team. His guidance and encouragement were invaluable in helping us complete this project successfully.

---

We hope you find our Chrome extension useful and look forward to your feedback. Happy browsing!
