const single = (resource) => ({
    token: resource.token,
});

const multiple = ((resources) => resources.map( resource => single(resource)));

module.exports = {
    single,
    multiple
}