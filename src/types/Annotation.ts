enum Config {
  HEALTH_CONFIG = 'health_config'
}
/*
const configuration = {
  health_config : {
    type: 'object',
    categories: {
      rate: {
        type: 'Array',
        categories: {
          protocol: {
            type: 'string'
          },
          degraded: {
            type: 'number'
          },
          failure: {
            type: 'number'
          }
        }
      }
    }
  }
};
*/

export type Annotation = {
  title: string;
  id: string;
  validated: boolean;
  error: string;
  content: any;
};

export class KialiAnnotation {
  annotation: string;
  isJson: boolean;
  isValid: boolean;
  jsonObj: any;
  validations: Annotation[];

  constructor(annotation: string) {
    this.annotation = annotation;
    this.isJson = false;
    this.jsonObj = undefined;
    this.validations = [];
    this.isValid = this.validate();
  }

  validateJson = (): boolean => {
    if (!this.isJson) {
      try {
        this.jsonObj = JSON.parse(this.annotation);

        this.isJson = true;
      } catch (e) {
        this.isJson = false;
      }
    }
    return this.isJson;
  };

  validate = (): boolean => {
    if (this.validateJson()) {
      return this.validateHealth();
    }
    return false;
  };

  validateHealth = (): boolean => {
    const filt = this.validations.filter(annotation => annotation.id === Config.HEALTH_CONFIG);
    if (filt.length === 1) {
      return filt[0].validated;
    }
    var annotate: Annotation = {
      title: 'Health Config',
      id: Config.HEALTH_CONFIG,
      error: '',
      validated: false,
      content: undefined
    };
    if (Config.HEALTH_CONFIG in this.jsonObj) {
      annotate.content = this.jsonObj[Config.HEALTH_CONFIG];
      annotate.error = 'EOO';
      annotate.validated = true;
    }
    this.validations.push(annotate);
    return annotate.validated;
  };
}
