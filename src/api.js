const base = 'https://retoolapi.dev/HjLXfJ/note_talking_app';

async function send({method, path, data}) {
    const opts = { method, headers: {} };

    if (data) {
        opts.headers['Content-Type'] = 'application/json';
        opts.body = JSON.stringify(data);
    }

    return fetch(`${base}/${path}`, opts)
    .then((result) => result.text())
    .then((json) => {
        try {
            return JSON.parse(json);
        } catch (err) {
            return json;
        }
    });
}

export function get(path = '') {
    return send({ method: 'GET', path });
}

export function del(path = '') {
    return send({ method: 'DELETE', path });
}

export function post(path = '', data = '') {
    return send({ method: 'POST', path, data });
}

export function put(path = '', data = '') {
    return send({ method: 'PUT', path, data });
}