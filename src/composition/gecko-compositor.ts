import type { MetadataAdapter } from "@/domain/adapter/metadata-adapter";
import { MetadataAdapterDefault } from "@/domain/adapter/metadata-adapter-default";
import type { GeckoFacade } from "@/domain/facade/gecko-facade";
import { GeckoFacadeDefault } from "@/domain/facade/gecko-facade-default";
import GeckoFacadeSaving from "@/domain/facade/gecko-facade-saving";
import type { GeckoProcessorFactory } from "@/domain/factory/gecko-processor-factory";
import { GeckoProcessorFactoryDefault } from "@/domain/factory/gecko-processor-factory-default";
import type MetadataDao from "@/domain/persistence/dao-metadata";
import Database from "@/domain/persistence/database";
import type { GeckoProcessor } from "@/domain/processor/gecko-processor";
import PartProcessor from "@/domain/processor/part-processor";

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

}