$(document).ready(function () {
  const menuList = $('#menuList');

  // Function to fetch and display menus
  function fetchmenus() {
      $.ajax({
          url: 'http://localhost:3000/api/menu',
          method: 'GET',
          crossDomain: true,
          xhrFields: {
              withCredentials: true,
          },
          dataType: 'json',
          success: function (data) {
              menuList.empty(); // Clear previous list

              $.each(data, function (index, menu) {
                  const listItem = $('<li>').text(`dishName: ${menu.dishName}, price: ${menu.price}`);

                  // Add update and delete buttons
                  const updateButton = $('<button>').text('Update').on('click', function () {
                      updatemenu(menu._id);
                  });

                  const deleteButton = $('<button>').text('Delete').on('click', function () {
                      deletemenu(menu._id);
                  });

                  listItem.append(updateButton, deleteButton);
                  menuList.append(listItem);
              });
          },
          error: function (error) {
              console.error('Error fetching menus:', error);
          }
      });
  }

  // Initial fetch on page load
  fetchmenus();

  // Function to add a new menu
  window.addmenu = function () {
      const dishName = $('#dishName').val();
      const details = $('#details').val();
      const price = $('#price').val();

      $.ajax({
          url: 'http://localhost:3000/api/menu',
          method: 'POST',
          contentType: 'application/json',
          data: JSON.stringify({ dishName, details, price }),
          dataType: 'json',
          success: function (data) {
              console.log('New menu added:', data);
              // Fetch and display menus again after adding a new menu
              fetchmenus();
          },
          error: function (error) {
              console.error('Error adding menu:', error);
          }
      });
  }

// Function to update an menu
window.updatemenu = function (menuId) {
  // Assuming you want to show a prompt for the user to enter new details
  const newdishName = prompt('Enter new dishName:');
  const newDetails = prompt('Enter new details:');
  const newprice = prompt('Enter new price:');

  // Make a PUT request to update the menu on the server
  $.ajax({
      url: `http://localhost:3000/api/menu/${menuId}`,
      method: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify({ dishName: newdishName, price: newprice }),
      dataType: 'json',
      success: function (data) {
          console.log(`menu with ID ${menuId} updated:`, data);
          // Fetch and display menus again after updating an menu
          fetchmenus();
      },
      error: function (error) {
          console.error(`Error updating menu with ID ${menuId}:`, error);
      }
  });
}

// Function to delete an menu
window.deletemenu = function (menuId) {
  // Assuming you want to show a confirmation dialog
  const confirmed = confirm('Are you sure you want to delete this menu?');

  if (confirmed) {
      // Make a DELETE request to remove the menu from the server
      $.ajax({
          url: `http://localhost:3000/api/menu/${menuId}`,
          method: 'DELETE',
          success: function (data) {
              console.log(`menu with ID ${menuId} deleted:`, data);
              // Fetch and display menus again after deleting an menu
              fetchmenus();
          },
          error: function (error) {
              console.error(`Error deleting menu with ID ${menuId}:`, error);
          }
      });
  }
}

});
