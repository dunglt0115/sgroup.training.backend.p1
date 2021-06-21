FilePond.registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginImageResize,
    FilePondPluginFileEncode,
)

FilePond.setOptions({
    imageResizeTargetHeight: 500,
    imageResizeTargetWidth: 328,
})

FilePond.parse(document.body);
