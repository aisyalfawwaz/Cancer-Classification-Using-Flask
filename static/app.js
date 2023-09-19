const showLoading = () => {
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "Loading...";
};

const previewImage = (input) => {
  const preview = document.getElementById("image-preview");
  const previewUrlInput = document.getElementById("image-preview-url");

  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = (e) => {
      preview.src = e.target.result;
      previewUrlInput.value = e.target.result; // Set the image preview URL
      preview.classList.remove("hidden");
    };
    reader.readAsDataURL(input.files[0]);
  } else {
    preview.src = "";
    previewUrlInput.value = ""; // Clear the image preview URL
    preview.classList.add("hidden");
  }
};

const handleFormSubmit = async (event) => {
  event.preventDefault(); // Prevent the default form submission
  showLoading(); // Show loading message
  
  try {
    const response = await fetch('/', {
      method: 'POST',
      body: new FormData(event.target)
    });

    if (response.ok) {
      const data = await response.json(); // Assuming the response is JSON
      console.log('Response data:', data);
    } else {
      console.error('Error:', response.status);
    }
  } catch (error) {
    console.error('Fetch error:', error);
  }
};
