# Backend Architecture Changes

This document outlines all modifications made to the Spring Boot microservices, API Gateway, and database configurations. It breaks down what the original state was, what exactly was changed, and the rationale behind each decision.

---

## 1. Database Migration & Connection Pooling
**Applies to:** `order-service`, `food-service`, `user-service` (`application.properties`)

* **Before:** The microservices were configured to connect to a PostgreSQL database (Supabase) using default connection pool settings.
* **Changed:** 
  * Replaced the database URLs, usernames, and passwords to point to the new external MySQL server hosted on `freesqldatabase.com`.
  * Added `spring.datasource.hikari.maximum-pool-size=2` to all three microservices.
* **Why:** You requested to abandon Supabase and use your custom MySQL server. The Hikari pool size limiter was a critical addition because `freesqldatabase.com` severely limits the number of concurrent connections. Without restricting the pool size to 2, the three microservices would instantly exhaust the connection limit upon startup, causing them to crash with a `JDBC metadata` exception.

## 2. Maven Database Drivers
**Applies to:** `order-service` (`pom.xml`)

* **Before:** The project dependencies included the PostgreSQL JDBC driver (`org.postgresql`).
* **Changed:** Swapped the dependency out for `mysql-connector-j`.
* **Why:** Spring Data JPA and Hibernate need the correct dialect and driver to communicate with the database. Since we moved to MySQL, the PostgreSQL driver was causing application startup failures.

## 3. Cross-Origin Resource Sharing (CORS)
**Applies to:** `FoodApp-ApiGateway` (`SecurityConfig.java`)

* **Before:** The API Gateway did not have a global CORS configuration that explicitly trusted local development servers.
* **Changed:** Implemented a global `CorsWebFilter` bean that explicitly allows requests from `http://localhost:3000` and `http://localhost:3001` with `setAllowCredentials(true)`.
* **Why:** Whenever the React frontend attempted to fetch data (like the food menu) from the API Gateway, the browser would block the request with a "CORS Policy" error. This change tells the API Gateway that our frontend is a trusted source.

## 4. User Access to Food Menus
**Applies to:** `FoodApp-ApiGateway` (`SecurityConfig.java`)

* **Before:** `pathMatchers("/admin/**").hasRole("ADMIN")`. Every single endpoint inside the `food-service` was strictly locked down to administrators.
* **Changed:** Added `pathMatchers(HttpMethod.GET, "/admin/**").hasAnyRole("USER", "ADMIN")` to open up read-only requests. We also explicitly locked down `/admin/all` to administrators only.
* **Why:** Users need to be able to see the food menu to place an order! By opening up `GET` requests, users can now search categories and view available foods without receiving a `403 Forbidden` error. We kept `/admin/all` locked down so normal users cannot see hidden or out-of-stock foods.

## 5. Exposing the Order ID
**Applies to:** `order-service` (`OrderServiceImpl.java`)

* **Before:** When an order was placed, the `placeOrder` method returned a hardcoded string: `"Order Placed !!"`.
* **Changed:** Modified the return statement to dynamically inject the newly generated ID: `"Order Placed !! Order ID: " + order.getOrderId();`.
* **Why:** In order for users to later view or cancel their orders on the frontend, they need to know their unique Order ID. Returning it directly in the confirmation message solves this without requiring a complex architectural change.

## 6. Smart Category Searching
**Applies to:** `food-service` (`FoodRepository.java` & `FoodServiceImpl.java`)

* **Before:** The database query was mapped as `List<Food> findByCategory(String category);`.
* **Changed:** Updated the query to `List<Food> findByCategoryContainingIgnoreCase(String category);`.
* **Why:** The original query required an exact, case-sensitive match (e.g., searching "italian" would return absolutely nothing because the database had it saved as "Italian"). The new JPA method allows for smart, case-insensitive, partial matching (e.g., searching "ita" successfully finds "Italian").

## 7. Git Monorepo Cleanup
**Applies to:** All Microservices

* **Before:** Every single microservice folder had its own hidden `.git` folder, treating them as disconnected Git submodules.
* **Changed:** Deleted the nested `.git` folders and created a `.gitignore` at the root of `~/Ananya`.
* **Why:** Treating the architecture as a single "Monorepo" makes it significantly easier to push, pull, and track code changes across the entire platform via GitHub without dealing with desynced submodules.
