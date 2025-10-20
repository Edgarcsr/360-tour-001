import { bathroomScene } from "./bathroom.scene";
import { suiteScene } from "./suite.scene";
import { hallwayScene } from "./hallway.scene";
import { kidsBedroomScene } from "./kids-bedroom.scene";
import { suiteBathroomScene } from "./suite-bathroom.scene";
import { livingRoomScene } from "./living-room.scene";
import { entranceScene } from "./entrance.scene";
import { kitchenScene } from "./kitchen.scene";
import { balconyScene } from "./balcony.scene";

export type { Callout, Lensflare, Marker, Position, Scene } from "./types";

export const scenes = [livingRoomScene, bathroomScene, kidsBedroomScene, suiteScene, suiteBathroomScene, hallwayScene, entranceScene, kitchenScene, balconyScene];
