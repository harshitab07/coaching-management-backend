const Response = (res, status, isResultCorrect, message, data, error) => {
    return res.status(status === '' ? 200 : status).send({
        success: status === 200 ? true : false,
        isResultCorrect,
        message,
        data: data || null,
        error: error || null
    });
};

export default Response;