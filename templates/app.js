const showLoading = () => {
  document.getElementById("result").innerHTML = "Loading...";
};

const previewImage = (input) => {
  const preview = document.getElementById("image-preview");
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = (e) => {
      preview.src = e.target.result;
      preview.classList.remove("hidden");
    };
    reader.readAsDataURL(input.files[0]);
  } else {
    preview.src = "";
    preview.classList.add("hidden");
  }
};
