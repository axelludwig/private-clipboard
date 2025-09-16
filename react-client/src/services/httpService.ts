const getClips = (access: string) => {

    return fetch(process.env.REACT_APP_URL + "clips?access=" + access, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Api-Key": "rwuy6434tgdgjhtiojiosi838tjue3"
        }
    })
        .then(response => {
            return response.json();
        })
}

const deleteClip = (id: number) => {
    return fetch(process.env.REACT_APP_URL + "clips", {
        method: "DELETE",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Api-Key": "rwuy6434tgdgjhtiojiosi838tjue3"
        },
        body: JSON.stringify({
            id: id
        })
    }).catch(error => {
        console.error(error);
    });
}

const postClip = (json: any) => {
    return fetch(process.env.REACT_APP_URL + "clips", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(json)
    })
        .then(res => {
            return res.json();
        })
        .then(res => {
            json.id = res.id;
            // setNewClip(json);
            console.log(json);
            return json;
        })
        .catch(error => {
            console.error(error);
        });
}

export const httpService = {
    getClips,
    deleteClip,
    postClip
};