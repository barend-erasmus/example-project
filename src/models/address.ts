export class Address {
    constructor(
        public city: string,
        public country: string,
        public line1: string,
        public line2: string,
        public postalCode: string,
    ) {

    }

    public cityValid(): boolean {
        return this.city ? true : false;
    }

    public countryValid(): boolean {
        return this.country ? true : false;
    }

    public line1Valid(): boolean {
        return this.line1 ? true : false;
    }

    public line2Valid(): boolean {
        return this.line2 ? true : false;
    }

    public postalCodeValid(): boolean {
        return this.postalCode ? true : false;
    }

    public valid(): boolean {
        if (this.cityValid() && this.countryValid() && this.line1Valid() && this.line2Valid() && this.postalCodeValid()) {
            return true;
        }

        return false;
    }
}
