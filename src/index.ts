import * as request from 'request-promise-native';


function query(stop: string): request.RequestPromise {
    const query = `{stops(name: "${stop}") { name code }}`;

    return request({
        method: 'POST',
        uri: 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql',
        headers: {
            'content-type': 'application/graphql'
        },
        body: query
    });
}

function queryStops(stopId: string): Promise<any> {
    if (!stopId.length) {
        return Promise.resolve();
    }
    
    return query(stopId).then((response) => {
        const { data: { stops } } = JSON.parse(response);
        const nameOrNumber = Number(stopId) ? 'name' : 'code';
        const stop = stops[0];

        if (stop) {
            let result = { [stopId]: stop[nameOrNumber] }
            if (!Number(stopId) && stop.name !== stopId) {
               result = { ...result, properName: stop.name };
            }
            return Promise.resolve(result);
        }
        return Promise.resolve({ [stopId]: null });
    });
}

exports.stops = function stops(req: any, res: any) {
    const stops: string = req.body.stops || req.query.stops;
    if (stops) {
        Promise.all(
            stops.split(',').map((code: string) => queryStops(code))
        ).then(fulfilled =>
            fulfilled.reduce((list: any, cur: any) => [...list, cur], [])
        ).then(result => res.send(result));
    } else {
        res.send('Stops missing. Provide data as JSON {"stops": "4040,Liisankatu"} or in URL ?stops=4040');
    }
};