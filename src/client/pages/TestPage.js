import React from 'react';
import App from "@components/app"
import PageTemplate from '@components/common/PageTemplate';
import { DesktopBreakpoint , TabletBreakpoint , PhoneBreakpoint} from '@components/responsive_utilities/breakpoint';

const TestPage = props => {

  return (
    <App>
      <PageTemplate>
      <DesktopBreakpoint> <h3>DesktopBreakpoint</h3></DesktopBreakpoint>
      <TabletBreakpoint> <h3>TabletBreakpoint</h3></TabletBreakpoint>
      <PhoneBreakpoint> <h3>PhoneBreakpoint</h3></PhoneBreakpoint>
      </PageTemplate>
    </App>
    
  );
};

export default TestPage;