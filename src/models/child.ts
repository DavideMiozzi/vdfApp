import { ChildFeature } from "./child_feature";

export class Child {
  id: number;
  name: string;
  sex: string;
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
}