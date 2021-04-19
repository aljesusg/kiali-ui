import { DurationInSeconds } from './Common';
import { MeshCluster } from './Mesh';

export type IstioLabelKey = 'appLabelName' | 'versionLabelName' | 'injectionLabelName';

interface iter8Config {
  enabled: boolean;
}

interface ClusterInfo {
  name: string;
  network: string;
}

// Kiali addons/extensions specific
interface Extensions {
  iter8: iter8Config;
}

interface IstioAnnotations {
  istioInjectionAnnotation: string;
}

interface UIDefaults {
  metricsPerRefresh?: string;
  namespaces?: string[];
  refreshInterval?: string;
}

interface KialiFeatureFlags {
  istioInjectionAction: boolean;
  uiDefaults?: UIDefaults;
}

/*
 Health Config
*/
export type RegexConfig = string | RegExp;

export interface HealthConfig {
  rate: RateHealthConfig[];
}

// rateHealthConfig
export interface RateHealthConfig {
  namespace?: RegexConfig;
  kind?: RegexConfig;
  name?: RegexConfig;
  tolerance: ToleranceConfig[];
}
// toleranceConfig
export interface ToleranceConfig {
  code: RegexConfig;
  degraded: number;
  failure: number;
  protocol?: RegexConfig;
  direction?: RegexConfig;
}

export type LabelFilter = { [key: string]: RegExp };

export interface LabelValidation {
  namespace?: RegexConfig;
  kind?: RegexConfig;
  name?: RegexConfig;
  presence: string[];
  filterLabel: LabelFilter;
}
/*
 End Health Config
*/

export interface ServerConfig {
  clusterInfo?: ClusterInfo;
  clusters: { [key: string]: MeshCluster };
  extensions?: Extensions;
  healthConfig: HealthConfig;
  installationTag?: string;
  istioAnnotations: IstioAnnotations;
  istioIdentityDomain: string;
  istioNamespace: string;
  istioComponentNamespaces?: Map<string, string>;
  istioLabels: { [key in IstioLabelKey]: string } & { labelValidation: LabelValidation[] };
  kialiFeatureFlags: KialiFeatureFlags;
  prometheus: {
    globalScrapeInterval?: DurationInSeconds;
    storageTsdbRetention?: DurationInSeconds;
  };
}
