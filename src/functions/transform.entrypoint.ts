// -----------------------------------------------------------------------------
// Purpose: Transform entrypoint
// this is the entrypoint that will be called when the transformer is invoked
// to transform an event, the return value of this function will be passed to
// the read model adapter.
// -----------------------------------------------------------------------------
interface Input<T = any> {
  eventId: string;
  validTime: string;
  payload: T;
}

type Payload = {
  temp_c :string;
  wind_speed_mps: string;
  wind_dir: string;
}

const OPTIMAL_HEATING_IN_TEMP = 22.0;

export default async function (input: Input<Payload>) {

  const tempInNumber = parseFloat(input.payload.temp_c);
  const distanceBetweenTemps = OPTIMAL_HEATING_IN_TEMP - tempInNumber;

  return {
    eventid: input.eventId,
    validtime: input.validTime,
    ...input.payload,
    distance_from_optimal_heating: distanceBetweenTemps
  };
}
