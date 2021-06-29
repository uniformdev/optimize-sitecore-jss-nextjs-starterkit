/* eslint-disable */
// Do not edit this file, it is auto-generated at build time!
// See scripts/generate-component-factory.js to modify the generation of this file.
import Hero from "./components/Hero/Hero";
import LinkList from "./components/LinkList/LinkList";

import { EsiChoose, EsiInclude, EsiOtherwise, EsiWhen, EsiNullComponent, EsiForEach, EsiAssign, EsiText, EsiScript, EsiNoOutput, EsiContextCsr, EsiContextSsr } from '@uniformdev/esi-jss-react';

const components = new Map();
components.set("Hero", Hero);
components.set("LinkList", LinkList);

components.set('EsiChoose', EsiChoose); 
components.set('EsiInclude', EsiInclude);
components.set('EsiOtherwise', EsiOtherwise);
components.set('EsiWhen', EsiWhen);
components.set('EsiNullComponent', EsiNullComponent);
components.set('EsiForEach', EsiForEach);
components.set('EsiAssign', EsiAssign);
components.set('EsiText', EsiText);
components.set('EsiScript', EsiScript);
components.set('EsiNoOutput', EsiNoOutput);
components.set('EsiContextCsr', EsiContextCsr);
components.set('EsiContextSsr', EsiContextSsr);

export default function componentFactory(componentName) {
    return components.get(componentName);
}
