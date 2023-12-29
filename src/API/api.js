export const getImages = async (configParams) => {
    const queryParams = new URLSearchParams({
        key: '40694680-72f66d22c7844ca43ae47eff1',
        image_type: 'photo',
        orientation: 'horizontal',
        q: 'cat',
        per_page: 12,
        ...configParams,
    });

    const response = await fetch(`https://pixabay.com/api/?${queryParams}`);

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
};
