var ResumeManager = /** @class */ (function () {
    function ResumeManager() {
        this.data = {
            startYear: 2020,
            lastUpdated: new Date()
        };
    }
    ResumeManager.prototype.calculateYearsOfExperience = function () {
        var currentYear = new Date().getFullYear();
        return currentYear - this.data.startYear;
    };
    ResumeManager.prototype.formatData = function (date) {
        return date.toLocaleDateString();
    };
    ResumeManager.prototype.updateFooter = function () {
        var footerElement = document.getElementById('dynamic-footer');
        if (footerElement) {
            footerElement.innerHTML = "".concat(this.calculateYearsOfExperience(), " Years of Experience | Last Updated: ").concat(this.formatData(this.data.lastUpdated));
        }
    };
    return ResumeManager;
}());
document.addEventListener('DOMContentLoaded', function () {
    var resumeManager = new ResumeManager();
    resumeManager.updateFooter();
});
