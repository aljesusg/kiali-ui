import React from 'react';
import { style } from 'typestyle';
import { PFColors } from '../../Pf/PfColors';
import { RenderComponentScroll } from './RenderComponentScroll';

const containerPadding = style({ padding: '30px 20px 0 20px' });
const containerWhite = style({ backgroundColor: PFColors.White });

export class RenderContent extends React.Component<{ needScroll?: boolean }> {
  render() {
    return (
      <RenderComponentScroll className={containerPadding}>
        <div className={containerWhite}>{this.props.children}</div>
      </RenderComponentScroll>
    );
  }
}
