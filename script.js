document.addEventListener('DOMContentLoaded', function () {
  // Ensure jQuery is loaded
  if (typeof jQuery === 'undefined') {
    console.error('jQuery is not loaded.');
    return;
  }

  // Select the form element
  var form = document.getElementById('forum_login');

  // Check if the form exists
  if (form) {
    // Add an event listener for the submit event
    form.addEventListener('submit', function (event) {
      // Prevent the form from submitting normally
      event.preventDefault();

      // Create FormData object
      var formData = new FormData(form);
      var $button = $('#submitButton');
      var $loader = $('#loader');

      // Show the loader and disable the button
      $loader.removeClass('d-none');
      $button.addClass('btn-loading');
      $button.prop('disabled', true);

      // Append additional data
      //formData.append('action', 'my_custom_action'); // The action hook to call in PHP
      setCookie('validUser', false, 1);
      // Send AJAX request
      $.ajax({
        url: 'https://php-qss.testbase.online', // Use the localized variable
        type: 'POST',
        data: formData,
        processData: false, // Do not process the data
        contentType: false, // Do not set content type header
        dataType: 'json',
        success: function (response) {
          // console.log('Response:', response);
          $loader.addClass('d-none');
          $button.removeClass('btn-loading');
          let { emailExists } = response;
          if (emailExists == true) {
            window.location.href = '/email-found/';
            setCookie('validUser', true, 1);
            //toastr.success('Email Exists', 'Success')
          } else {
            //toastr.info('Email not exists. <br> Redirecting in Few Seconds', 'Info')

            window.location.href = '/email-not-found/';
          }
          $loader.addClass('d-none');
          $button.removeClass('btn-loading');
          $button.prop('disabled', false);
        },
        error: function (error) {
          // Handle errors
          // alert('An error occurred.');
          // console.log(error);
        },
      });
    });
  } else {
    console.error('Form with ID "forum_login" not found.');
  }

  function setCookie(name, value, days) {
    let expires = '';
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000); // Convert days to milliseconds
      expires = '; expires=' + date.toUTCString(); // Set the expiration date
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/'; // Set the cookie
  }
});

// -----------select-option------------

// document.addEventListener('DOMContentLoaded', () => {
//   const form = document.querySelector('form');
//   const fieldset1 = document.getElementById('fieldset1');
//   const fieldset2 = document.getElementById('fieldset2');
//   const fieldset3 = document.getElementById('fieldset3');
//   const fieldset4 = document.getElementById('fieldset4');

//   const selectForm = document.querySelector('.select-form');

//   // Initially set the active class for the first fieldset
//   selectForm.classList.add('fieldset1-active');

//   form.addEventListener('submit', function (event) {
//     event.preventDefault(); // Prevent the default form submission action

//     const selectedOption = document.querySelector(
//       'input[name="option"]:checked'
//     );

//     if (selectedOption) {
//       // Show the next fieldset
//       if (fieldset1.classList.contains('active')) {
//         fieldset1.classList.remove('active'); // Hide the current fieldset
//         fieldset2.classList.add('active'); // Show the next fieldset

//         // Update the pseudo-element width for step 2
//         selectForm.classList.remove('fieldset1-active');
//         selectForm.classList.add('fieldset2-active');
//       } else if (fieldset2.classList.contains('active')) {
//         fieldset2.classList.remove('active'); // Hide the current fieldset
//         fieldset3.classList.add('active'); // Show the next fieldset

//         // Update the pseudo-element width for step 3
//         selectForm.classList.remove('fieldset2-active');
//         selectForm.classList.add('fieldset3-active');
//       } else if (fieldset3.classList.contains('active')) {
//         fieldset3.classList.remove('active'); // Hide the current fieldset
//         fieldset4.classList.add('active'); // Show the next fieldset

//         // Update the pseudo-element width for step 3
//         selectForm.classList.remove('fieldset3-active');
//         selectForm.classList.add('fieldset4-active');
//       }
//     } else {
//       alert('Please select an option before continuing.');
//     }
//   });
// });

document.addEventListener('DOMContentLoaded', () => {
  // Define fieldsets and buttons
  const fieldsets = {
    1: document.getElementById('fieldset1'),
    2: document.getElementById('fieldset2'),
    3: document.getElementById('fieldset3'),
    4: document.getElementById('fieldset4'),
  };

  const buttons = {
    continue1: document.getElementById('continue1'),
    continue2: document.getElementById('continue2'),
    continue3: document.getElementById('continue3'),
    continue4: document.getElementById('continue4'),
    back1: document.getElementById('back1'),
    back2: document.getElementById('back2'),
    back3: document.getElementById('back3'),
  };

  let currentFieldset = 1;

  function showFieldset(index) {
    Object.values(fieldsets).forEach((fieldset) => {
      fieldset.classList.toggle(
        'active',
        parseInt(fieldset.id.replace('fieldset', '')) === index
      );
    });
  }

  function handleContinueClick(nextIndex) {
    const selectedOption = document.querySelector(
      `fieldset:nth-of-type(${currentFieldset}) input[type="radio"]:checked`
    );

    if (nextIndex === 4 || selectedOption) {
      currentFieldset = nextIndex;
      showFieldset(currentFieldset);
    } else {
      alert('Please select an option before continuing.');
    }
  }

  buttons.continue1.addEventListener('click', () => handleContinueClick(2));
  buttons.continue2.addEventListener('click', () => handleContinueClick(3));
  buttons.continue3.addEventListener('click', () => handleContinueClick(4));

  buttons.continue4.addEventListener('click', () => {
    const firstName = document.getElementById('name').value.trim();
    const lastName = document.getElementById('last-name').value.trim();
    const email = document.getElementById('email').value.trim();

    if (firstName && lastName && email) {
      alert('Form submitted successfully.');
    } else {
      alert('Please fill out all fields before submitting.');
    }
  });

  function handleBackClick(prevIndex) {
    currentFieldset = prevIndex;
    showFieldset(currentFieldset);
  }

  buttons.back1.addEventListener('click', () => handleBackClick(1));
  buttons.back2.addEventListener('click', () => handleBackClick(2));
  buttons.back3.addEventListener('click', () => handleBackClick(3));

  showFieldset(currentFieldset);
});

// ----------popup-------

document.addEventListener('DOMContentLoaded', function () {
  const tooltipLink = document.querySelector('a[data-toggle="tooltip"]');
  const popup = document.querySelector('.popup');

  tooltipLink.addEventListener('mouseover', function () {
    popup.style.display = 'block';
  });

  tooltipLink.addEventListener('mouseout', function () {
    popup.style.display = 'none';
  });

  popup.addEventListener('mouseover', function () {
    popup.style.display = 'block';
  });

  popup.addEventListener('mouseout', function () {
    popup.style.display = 'none';
  });
});
