<?php
// Database credentials
$servername = "localhost";
$username = "root";
$password = "brian003xxx"; // your MySQL password
$dbname = "food_db";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the form data
    $name = $_POST["name"];
    $description = $_POST["description"];
    $price = $_POST["price"];

    // Prepare and bind
    $stmt = $conn->prepare("INSERT INTO food_items (name, description, price) VALUES (?, ?, ?)");
    $stmt->bind_param("ssd", $name, $description, $price);

    // Execute the statement
    if ($stmt->execute()) {
        echo "New food item added successfully.";
    } else {
        echo "Error: " . $stmt->error;
    }

    // Close the statement and connection
    $stmt->close();
    $conn->close();
} else {
    echo "Invalid request.";
}
?>
