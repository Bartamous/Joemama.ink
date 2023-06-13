var categoryLinks = document.querySelectorAll("nav ul li a");
for (var i = 0; i < categoryLinks.length; i++) {
  categoryLinks[i].addEventListener("click", function(event) {
    event.preventDefault();
    // hide all forum sections
    var forumSections = document.querySelectorAll(".forum-section");
    for (var j = 0; j < forumSections.length; j++) {
      forumSections[j].style.display = "none";
    }
    // show the selected forum section
    var selectedSection = document.querySelector(this.getAttribute("href"));
    selectedSection.style.display = "block";
  });
}
