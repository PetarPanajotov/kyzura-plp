# Kyzura PLP


**Live Demo:** [https://kyzura-plp.vercel.app/](https://kyzura-plp.vercel.app/)

If you want to run this project on your own machine, follow these steps:

```bash
# 1. Clone the repository
git clone https://github.com/PetarPanajotov/kyzura-plp.git
cd kyzura-plp

# 2. Install dependencies (using pnpm)
pnpm install

# 3. Run the development server
pnpm dev

# 4. Build for production
pnpm build
```


## What has been implemented

The Kyzura PLP is a fully functional and responsive e-commerce page. Here is a list of the main features I developed:

* **Sticky Header & Navigation:** A top navigation bar that stays visible while scrolling. It includes the logo and links for categories like Bags, Shoes, Accessories, and Outerwear. It loads the first category by default, and you can easily add new categories just by updating `/utils/constants.ts` and the `public/product.json` file.
* **Product Grid:** A responsive layout that starts with a maximum of 4 rows to keep the UI clean and organized.
* **Detailed Product Cards:** Each card shows an image, star rating, name, description, price, and any active discounts.
* **Add to Cart:** There is a button on every product that shows a success alert when clicked.
* **Category Info:** I included a clear title and description at the top of the grid so users know which category they are browsing.
* **Filtering Mechanism:** A dedicated sidebar on the left where users can filter products by price, rating, and special tags. I also created a **"No Products Found" component** to be shown when no products match the selected filters, ensuring the user always gets feedback.
* **Mobile Filter Drawer:** On smaller screens, the filters move into a custom drawer to save space and make the mobile experience better.
* **Sorting Controls:** A dropdown menu above the grid to sort products alphabetically (A–Z, Z–A) or by price (Low to High and vice versa).
* **Load More Pagination:** Instead of loading everything at once, users can click "Load More" to see another set of products. This button stays active until all available products are shown.
* **Static Footer:** A persistent section with links for things like Privacy Policy and Contact Us. **Note:** These links are just for visuals and do not lead to active pages.

---

## Technologies Used

* **Core Framework:** React
* **Build Tool:** Vite
* **Styling:** SCSS + Modules
* **Routing:** React Router DOM
* **Icons:** Lucide
* **Animation:** Motion for React
* **Deployment:** Vercel

> **Note:** I chose to focus strictly on the front-end and UI/UX for this task. Since the project doesn’t need SEO, I used standard React because it is lightweight. If SEO or Server-Side Rendering were required, I would have used Next.js instead.

---

## How I built the solution

I focused on making the code modular and easy to maintain. Every component in this project was built from scratch.

* **Components:** I split the UI into logical parts like `ProductCard`, `FilterPanel`, `Filter`, and `Drawer` and more.
* **State Management:** I used `useState` for local logic, but for things that need to be shared globally (like the cart counter), I used the **React Context API**.
* **Data Handling:** The app fetches product data from a `product.json` file when category is first loads. After that, all the filtering, sorting, and "Load More" logic happens on the client side.
* **Workflow:** Using Vite helped me set up the project quickly and provided a very smooth development environment.

---

## Challenges I faced

* **Mobile Drawer Logic:** Building a custom drawer for mobile was one of the toughest parts of the project. I wanted it to feel professional, so I added "Escape" key support and smooth animations. I initially tried to make it close automatically when resizing the window above 1024px, but the exit animation would play during the resize, leaving strange visual artifacts on the screen. To keep the experience smooth and avoid these glitches, I decided to let the drawer stay open during a resize. This was a better choice because it didn't break the UI and felt much more natural for the user.
* **Filtering Logic:** Making the filters work properly together took about a full day of work. I had to refactor the logic several times to make sure users could filter by price, rating, and tags at the same time without any bugs or slow performance.
* **Data Sourcing & Generation:** It was hard to find a good dataset because most categories I found only had 10–15 products. To make sure the "Load More" button actually had work to do, I used Gemini to help me generate a larger `product.json` file with more variety to simulate a real-world inventory. Because of this, I used random images from the web, which might repeat across different product cards in the grid.