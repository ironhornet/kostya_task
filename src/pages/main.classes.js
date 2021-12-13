class Company {
    isActive = false;
    #color;

    constructor(data) {
        this.title = data.title;
        this.id = data.id;
        this.userId = data.userId;
    }

    disable() {
        this.isActive = false;
    }
    undisable() {
        this.isActive = true;
    }
    addColor(color) {
        this.color = color;
    }
    getColor() {
        return this.color;
    }
    deleteColor() {
        this.color = '';
    }
    formatedTitle() {
        this.title.toUpperCase().trim()
    }
}

export default Company