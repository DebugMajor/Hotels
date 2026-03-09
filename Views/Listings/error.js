<% layout("Layouts/boilerplate") %>

    <div class="container mt-5">

        <h1 class="text-danger">Something went wrong</h1>

        <p>
            <%= err.message %>
        </p>

        <p>
            Status Code: <%= err.statusCode %>
        </p>

        <a href="/listings" class="btn btn-dark">
            Go Back
        </a>

    </div>