import * as React from 'react';
import { ServiceDetailsInfo } from '../../types/ServiceInfo';
import * as AlertUtils from '../../utils/AlertUtils';
import AceEditor from 'react-ace';

interface Props {
  fetchAnnotation: Promise<ServiceDetailsInfo>;
}

interface AnnotationState {
  annotation: string | undefined;
}

class Annotation extends React.Component<Props, AnnotationState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      annotation: undefined
    };
  }

  componentDidMount() {
    this.props.fetchAnnotation
      .then(result => {
        console.log(result);
        this.setState({
          annotation: 'kiali' in result.service.annotations ? result.service.annotations['kiali'] : undefined
        });
      })
      .catch(error => {
        AlertUtils.addError('Could not fetch Service Details.', error);
      });
  }

  render() {
    return (
      <>
        {this.state.annotation ? (
          <AceEditor
            mode={'yaml'}
            theme="eclipse"
            height={'var(--kiali-yaml-editor-height)'}
            width={'100%'}
            className={'istio-ace-editor'}
            wrapEnabled={true}
            readOnly={true}
            value={this.state.annotation}
          />
        ) : (
          'No kiali annotation'
        )}
      </>
    );
  }
}

export default Annotation;
