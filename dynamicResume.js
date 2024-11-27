var form = document.getElementById("resumeForm");
var resumeContent = document.getElementById("resumeContent");
if (form) {
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        var formData = new FormData(form);
        var data = {
            name: formData.get("name"),
            email: formData.get("email"),
            phone: formData.get("phone"),
            education: formData.get("education"),
            institute: formData.get("institute"),
            year: parseInt(formData.get("year"), 10),
            workExperience: formData.get("workExperience"),
            skills: formData.get("skills")
                .split(",")
                .map(function (skill) { return skill.trim(); }),
        };
        if (validateForm(data)) {
            generateResume(data);
        }
        else {
            alert("Fill all fields accurately.");
        }
    });
}
function validateForm(data) {
    if (!data.name ||
        data.email.indexOf("@") === -1 ||
        !data.phone ||
        !data.education ||
        !data.institute ||
        isNaN(data.year) ||
        !data.workExperience ||
        data.skills.length === 0) {
        return false;
    }
    else {
        return true;
    }
}
function generateResume(data) {
    if (resumeContent) {
        resumeContent.innerHTML = "\n          <h2>Generated Resume</h2>\n          <h3>".concat(data.name, "</h3>\n          <p><strong>Email: </strong>").concat(data.email, "</p>\n          <p><strong>Phone: </strong>").concat(data.phone, "</p>\n          <hr>\n          <h4>Education</h4>\n          <p>").concat(data.education, " from ").concat(data.institute, " (").concat(data.year, ")</p>\n          <hr>\n          <h4>Work Experience</h4>\n          <p>").concat(data.workExperience, "</p>\n          <hr>\n          <h4>Skills</h4>\n          <ul>").concat(data.skills.map(function (skill) { return "<li>".concat(skill, "</li>"); }).join(""), "</ul>\n          ");
    }
}
document.addEventListener("DOMContentLoaded", function () {
    var resumeContent = document.getElementById("resumeContent");
    function makeEditable(sectionId) {
        var section = document.getElementById(sectionId);
        if (section) {
            section.setAttribute("contenteditable", "true");
            section.addEventListener("input", function (e) {
                var target = e.target;
                localStorage.setItem(sectionId, target.innerHTML);
            });
        }
    }
    function LoalSavedContent(sectionId) {
        var savedContent = localStorage.getItem(sectionId);
        if (savedContent) {
            var section = document.getElementById(sectionId);
            if (section) {
                section.innerText = savedContent;
            }
        }
    }
    if (resumeContent) {
        var sections = [
            "name",
            "email",
            "phone",
            "education",
            "institute",
            "workExperience",
            "skills",
        ];
        sections.forEach(function (sectionId) {
            makeEditable(sectionId);
            LoalSavedContent(sectionId);
        });
    }
});
document.addEventListener("DOMContentLoaded", function () {
    var downloadButton = document.getElementById("downloadResume");
    var shareButton = document.getElementById("shareResume");
    var resumeContent = document.getElementById("resumeContent");
    // Function to generate a unique URL
    function generateUniqueURL(data) {
        var baseURL = "https://username.vercel.app/resume";
        var uniquePath = encodeURIComponent("".concat(data.name, "-").concat(Date.now()));
        return "".concat(baseURL, "/").concat(uniquePath);
    }
    // Function to download resume as PDF
    function downloadAsPDF() {
        if (resumeContent) {
            var pdfContent = resumeContent.innerHTML;
            var blob = new Blob([pdfContent], { type: "application/pdf" });
            var link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "Resume.pdf";
            link.click();
            URL.revokeObjectURL(link.href);
        }
    }
    // Function to share the resume link on social media
    function shareResumeURL(data) {
        var uniqueURL = generateUniqueURL(data);
        if (navigator.share) {
            navigator
                .share({
                title: "".concat(data.name, "'s Resume"),
                text: "Check out my resume!",
                url: uniqueURL,
            })
                .then(function () { return console.log("Resume shared successfully"); })
                .catch(function (error) { return console.error("Error sharing resume:", error); });
        }
        else {
            alert("Share this link: ".concat(uniqueURL));
        }
    }
    // Event listeners
    if (downloadButton) {
        downloadButton.addEventListener("click", function () {
            downloadAsPDF();
        });
    }
    if (shareButton) {
        shareButton.addEventListener("click", function () {
            var formData = new FormData(form);
            var data = {
                name: formData.get("name"),
                email: formData.get("email"),
                phone: formData.get("phone"),
                education: formData.get("education"),
                institute: formData.get("institute"),
                year: parseInt(formData.get("year"), 10),
                workExperience: formData.get("workExperience"),
                skills: formData.get("skills")
                    .split(",")
                    .map(function (skill) { return skill.trim(); }),
            };
            if (validateForm(data)) {
                shareResumeURL(data);
            }
            else {
                alert("Ensure all fields are filled correctly before sharing.");
            }
        });
    }
});
