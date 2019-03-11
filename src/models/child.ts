import { ChildFeature } from "./child_feature";

export class Child {
  id: number;
  name: string;
  sex: string;
  features_string: string;
  child_features: ChildFeature[];

  constructor(id, name, sex, child_features) {
    this.id = id;
    this.name = name;
    this.sex  = sex;
    this.child_features = child_features;
  }

  get featureString():string {
    let featureString = this.sex == "boy" ? "m_" : "f_"
    featureString += "o_" + this.child_features.filter(feature => feature.feature == 'eyeColor')[0].value
    featureString += "_c_" + this.child_features.filter(feature => feature.feature == 'hairShape')[0].value
    featureString += this.child_features.filter(feature => feature.feature == 'hairColor')[0].value
    featureString += "_p_" + this.child_features.filter(feature => feature.feature == 'skinColor')[0].value
    return featureString
  }

  get hairColor():string {
    return this.child_features.filter(feature => feature.feature == 'hairColor')[0].value;
  }
  
  set hairColor(hairColor:string) {
    this.child_features.filter(feature => feature.feature == 'hairColor')[0].value = hairColor;
  }

  get skinColor():string {
    return this.child_features.filter(feature => feature.feature == 'skinColor')[0].value;
  }
  
  set skinColor(skinColor:string) {
    this.child_features.filter(feature => feature.feature == 'skinColor')[0].value = skinColor;
  }

  get eyeColor():string {
    return this.child_features.filter(feature => feature.feature == 'eyeColor')[0].value;
  }
  
  set eyeColor(eyeColor:string) {
    this.child_features.filter(feature => feature.feature == 'eyeColor')[0].value = eyeColor;
  }

  get hairShape():string {
    return this.child_features.filter(feature => feature.feature == 'hairShape')[0].value;
  }
  
  set hairShape(hairShape:string) {
    this.child_features.filter(feature => feature.feature == 'hairShape')[0].value = hairShape;
  }

  public static getRandomChild() {
    const _sexArray = [ 'boy', 'girl' ];
    const _hairShapeArray = [ 'co', 'lu', 'ri' ];
    const _hairColorArray = [ 'ro', 'ne', 'bi', 'ca' ];
    const _skinColorArray = [ 'bi', 'ro', 'ne' ];
    const _eyeColorArray = [ 'ne', 'ma', 've', 'az' ];

    var _sex = _sexArray[Math.floor(Math.random()*_sexArray.length)];

    var _features = new Array(
      new ChildFeature('hairShape', _hairShapeArray[Math.floor(Math.random()*_hairShapeArray.length)] ),
      new ChildFeature('hairColor', _hairColorArray[Math.floor(Math.random()*_hairColorArray.length)] ),
      new ChildFeature('skinColor', _skinColorArray[Math.floor(Math.random()*_skinColorArray.length)] ),
      new ChildFeature('eyeColor', _eyeColorArray[Math.floor(Math.random()*_eyeColorArray.length)] ),
      new ChildFeature('dogName', ''),
      new ChildFeature('grandMaName', ''),
      new ChildFeature('grandPaName', '')
    );

    return new Child(0, '', _sex, _features);
  }
}