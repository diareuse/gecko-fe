import type { MetadataAdapter } from "@/domain/adapter/metadata-adapter";
import { MetadataAdapterDefault } from "@/domain/adapter/metadata-adapter-default";
import type { GeckoFacade } from "@/domain/facade/gecko-facade";
import { GeckoFacadeDefault } from "@/domain/facade/gecko-facade-default";
import GeckoFacadeSaving from "@/domain/facade/gecko-facade-saving";
import type { GeckoProcessorFactory } from "@/domain/factory/gecko-processor-factory";
import { GeckoProcessorFactoryDefault } from "@/domain/factory/gecko-processor-factory-default";
import type MetadataDao from "@/domain/persistence/dao-metadata";
import Database from "@/domain/persistence/database";
import type ColorProcessor from "@/domain/processor/color-processor";
import ColorProcessorCode from "@/domain/processor/color-processor-code";
import ColorProcessorMethod from "@/domain/processor/color-processor-method";
import type { GeckoProcessor } from "@/domain/processor/gecko-processor";
import PartProcessor from "@/domain/processor/part-processor";

export declare type ColorProcessorType = "method" | "code"

export class GeckoCompositor {

    private static getProcessor(): GeckoProcessor {
        const factory: GeckoProcessorFactory = new GeckoProcessorFactoryDefault()
        return factory.getProcessor()
    }

    private static getAdapter(): MetadataAdapter {
        return new MetadataAdapterDefault()
    }

    public static getFacade(): GeckoFacade {
        let facade: GeckoFacade
        facade = new GeckoFacadeDefault(this.getProcessor(), this.getAdapter())
        facade = new GeckoFacadeSaving(facade, this.getMetadataDao())
        return facade
    }

    static getMetadataDao(): MetadataDao {
        return this.getDatabase().metadata()
    }

    static getDatabase(): Database {
        return new Database()
    }

    public static getPartProcessor(): PartProcessor {
        return new PartProcessor()
    }

    public static getMethodColor(): ColorProcessor<string> {
        return new ColorProcessorMethod()
    }

    public static getCodeColor(): ColorProcessor<number> {
        return new ColorProcessorCode()
    }

}