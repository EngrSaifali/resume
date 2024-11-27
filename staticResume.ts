interface ResumeData {
    startYear: number;
    lastUpdated: Date;
}

class ResumeManager {
    private data:ResumeData;

    constructor() {
        this.data = {
            startYear : 2020,
            lastUpdated : new Date()
        };
    }

    private calculateYearsOfExperience(): number {
        const currentYear = new Date().getFullYear();
        return currentYear - this.data.startYear;
    }

    private formatData(date: Date): string {
        return date.toLocaleDateString();
    }

    public updateFooter(): void {
        const footerElement = document.getElementById('dynamic-footer');
        if(footerElement) {
            footerElement.innerHTML = `${this.calculateYearsOfExperience()} Years of Experience | Last Updated: ${this.formatData(this.data.lastUpdated)}`;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const resumeManager = new ResumeManager();
    resumeManager.updateFooter();
});