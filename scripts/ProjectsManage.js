// Select projects management elements from html page.
const projectsForm = document.querySelector(".ProjectsManage__wrapper");
const projectSend = document.querySelector(".ProjectsManage__send");
const projectTitleEl = document.querySelector("#ProjectTitle");
const projectCaptionEl = document.querySelector("#ProjectCaption");
const projectLinkEl = document.querySelector("#ProjectLink");
const projectImageEl = document.querySelector("#ProjectImage");

// Disable the project submit button until validation is complete.
projectSend.disabled = true;

// Definition API URL.
const resumesAPI = "https://6ab248975b9b60f39d34816e.mockapi.io/api/v1/resumes";

// Create a validation function for validating project form.
const projectsFormValidator = () => {
    let formStatus = false;
    if (
        projectTitleEl.value != "" &&
        projectCaptionEl.value != "" &&
        projectLinkEl.value != "" &&
        projectImageEl.value != ""
    ) {
        formStatus = true;
    }
    else {
        formStatus = false;
    };

    if (formStatus) {
        let projectImageFile = projectImageEl.value.substring(12);

        if (
            projectImageFile.includes("png") ||
            projectImageFile.includes("jpg") ||
            projectImageFile.includes("jpeg")
        ) {
            formStatus = true;
        }
        else {
            formStatus = false;
        };
    };

    formStatus ? projectSend.disabled = false : projectSend.disabled = true;
};

const sendProjectToApi = () => {
    let resumeTitle = projectTitleEl.value;
    let resumeCaption = projectCaptionEl.value;
    let resumeLink = projectLinkEl.value;
    let resumeImage = projectImageEl.value.substring(12);

    let newRsume = {
        "resumeTitle": resumeTitle,
        "resumeCaption": resumeCaption,
        "resumeLink": resumeLink,
        "resumeImage": resumeImage
    };

    fetch(resumesAPI, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newRsume)
    })
        .then(response => {
            if (response.ok) {
                window.alert("اطلاعات رزومه با موفقیت ارسال شد");
                projectTitleEl.value = "";
                projectCaptionEl.value = "";
                projectLinkEl.value = "";
                projectImageEl.value = "";
            };
        })
        .catch(error => {
            console.log(`Encountered with this error: ${error}`);
        });
};

// Create a handler for the form submission.
const projectSendHandler = event => {
    event.preventDefault();
    sendProjectToApi();
};

// Add event listeners to elements on the project management page.
projectsForm.addEventListener("input", projectsFormValidator);
projectSend.addEventListener("click", projectSendHandler);

