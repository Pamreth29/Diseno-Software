//Pamela Morataya Sandoval - 2022108818

export class Product {
    constructor(
      public id: string,
      public name: string,
      public description: string,
      public price: number,
      public imageUrl: string,
      public videoUrl: string = '',
      public view360Url: string = ''
    ) {}
  }
  