import axios from "axios"

const api = axios.create({ baseURL: "http://localhost:8000/api" })

// Method Get

export const getDaftar = async () => {
    try {
        const response = await api.get("/daftar")
        return response.data
    } catch (error) {
        console.log("error get data", error)
        throw error
    }
}
export const getDaftarById = async (instansiId) => {
    try {
        const response = await api.get(`/daftar/${instansiId}`)
        return response.data
    } catch (error) {
        console.log("error get data", error)
        throw error
    }
}

export const getDaftarMenunggu = async (keyword, page, limit) => {
    try {
        const response = await api.get(
            `/daftar-menunggu?search_query=${keyword}&page=${page}&limit=${limit}`
        );
        return response.data
    } catch (error) {
        console.log("error get data", error)
        throw error
    }
}

export const getDaftarTerima = async (keyword, page, limit) => {
    try {
        const response = await api.get(
            `/daftar-terima?search_query=${keyword}&page=${page}&limit=${limit}`
        );
        return response.data
    } catch (error) {
        console.log("error get data", error)
        throw error
    }
}

export const getDaftarSelesai = async (keyword, page, limit) => {
    try {
        const response = await api.get(
            `/daftar-selesai?search_query=${keyword}&page=${page}&limit=${limit}`
        );
        return response.data
    } catch (error) {
        console.log("error get data", error)
        throw error
    }
}

export const getDaftarSelesaiById = async (instansiId) => {
    try {
        const response = await api.get(`/daftar-selesai/${instansiId}`);
        return response.data
    } catch (error) {
        console.error("gagal get data", error);
        throw error
    }

}

// Method Post
export const Daftar = async (formData) => {
    try {
        await api.post("/daftar", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return true
    } catch (error) {
        console.log("error post data", error)
        throw error
    }
}

export const Terima = async (instansiId, magangData) => {
    try {
        await api.post(`/daftar/terima/${instansiId}`, magangData);
        return true
    } catch (error) {
        console.error("gagal terima pelamar", error)
        throw error
    }
}

// Method Patch

export const updatePelamar = async (pelamarId, selectedPelamar) => {
    try {
        const response = await api.patch(`/pelamar/${pelamarId}`, selectedPelamar)
        return response.data
    } catch (error) {
        console.log("error update data", error)
        throw error
    }
}

export const updateInstansi = async (instansiId, instansiData) => {
    try {
        const response = await api.patch(`/instansi/${instansiId}`, instansiData)
        return response.data
    } catch (error) {
        console.log("error update data", error)
        throw error
    }
}

export const updateSurat = async (suratId, formData) => {
    try {
        const response = await api.patch(`/surat/${suratId}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        return response.data
    } catch (error) {
        console.log("error update data", error)
        throw error
    }
}

export const Tolak = async (instansiId) => {
    try {
        await api.patch(`/daftar/tolak/${instansiId}`, { alasan });
        return true
    } catch (error) {
        console.error("gagal tolak pelamar", error)
        throw error
    }
}

export const updateStatus = async (instansiId, status, tglMasuk, tglSelesai) => {
    try {
        const response = await axios.patch(
            `http://localhost:8000/api/instansi-magang/${instansiId}`,
            {
                status,
                tglMasuk,
                tglSelesai
            })
        if (response.status === 200) {
            return { success: true, message: response.data.msg };
        } else {
            return { success: false, message: 'Failed to update instansi magang' };
        }
    } catch (error) {
        console.error("gagal update status");
        throw error
    }

}


// Method Delete
export const deletePelamar = async (pelamarId) => {
    try {
        const response = await api.delete(`/pelamar/${pelamarId}`)
        return response.data
    } catch (error) {
        console.log("error delete data", error)
        throw error
    }
}






