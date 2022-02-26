import type { MetadataAdapter } from "@/domain/adapter/metadata-adapter";
import { MetadataAdapterDefault } from "@/domain/adapter/metadata-adapter-default";
import type { GeckoFacade } from "@/domain/facade/gecko-facade";
import { GeckoFacadeDefault } from "@/domain/facade/gecko-facade-default";
import type { GeckoProcessorFactory } from "@/domain/factory/gecko-processor-factory";
import { GeckoProcessorFactoryDefault } from "@/domain/factory/gecko-processor-factory-default";
import type { GeckoProcessor } from "@/domain/processor/gecko-processor";

export class GeckoCompositor {

    private static getProcessor(): GeckoProcessor {
        const factory: GeckoProcessorFactory = new GeckoProcessorFactoryDefault()
        return factory.getProcessor()
    }

    private static getAdapter(): MetadataAdapter {
        return new MetadataAdapterDefault()
    }

    public static getFacade(): GeckoFacade {
        return new GeckoFacadeDefault(this.getProcessor(), this.getAdapter())
    }

}