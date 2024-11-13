const axios = require("axios");
const MELHOR_ENVIO_TOKEN =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYzRjMzg0MGIxMTMyNDZmZmQ0ZmQzNzdiODIyYTQ1MWVhYTYxYjc4MmE1NTkwNDk3ZDJjOGE0ZmUzN2E3YzgwNTA5OGY2ZjkyNzQ0ZjIyODYiLCJpYXQiOjE3MzExODI0NjMuOTc4OTA2LCJuYmYiOjE3MzExODI0NjMuOTc4OTA3LCJleHAiOjE3NjI3MTg0NjMuOTY0MDI0LCJzdWIiOiI5ZDczM2E1YS02ZmEwLTRmZjItOTZmMy05NzE4ZmMxODEyZjYiLCJzY29wZXMiOlsic2hpcHBpbmctY2FsY3VsYXRlIl19.DygINuq8K7uSXRIQVOX9r6G56QPYtT44RcqRrMfgWnjFneRZVzeID2s5YEznNp3e03l0hhgpywYapY4l31wlRFPuCteOVf8jtTiUxJ-AkLDPzUpkyP7-u36yLGpQjV6imblvu-MObMi15rBWxSBURWx-gZfiHfYhyL8gdvuH_YiMimRbRF3Z5r6c5-pMrQoiWBYa4uNdn6gwZW9Tl4b25OyNMKQw09kI4GCuOzWfGdgVgIb5q6ecLV7g8dj3eCoGU8ZaFnKflPUhaEDM4kD66nCZ93add8_L-z95OMo235KEtxMZznaIgN7UMhb5szkhLWI0fIJZSV3bQF5sH_D502gN3POyasr_hiJuN7JKPCSjXOJ7pF_oaCE6rAdPFAdfSXEtmwcecBYfmLh7__1-hmD41UlLWv4zMb2yPmg6V6atWKtE6bzIGhcDkXiirb75fEoi4dhobpfGHODivjRZKnqNBx-BkzsU-V7REyxrBKoRm7_qdJ8-NZgtzzHRTyEJV9Ijlv-tx7zX_3kxFckO9rrpxdJefY_h903v6M7ODX46VSF4JWuKAbNEmcEXyywVxgzjLR4rzCtfPlUo1nmA9w9rtnOnR-Ju2thikMxBWDd1GHwKDCk82GqObVBd_I-A_ktFEN1W0XclMiljgNz5llKqFxJBV2vbIe4IaxhpDrM";

// Função para calcular o frete
exports.calcularFrete = async (req, res) => {
  const cepDestino = req.body.cepDestino;

  // Validação simples do formato do CEP
  const cepRegex = /^[0-9]{5}-?[0-9]{3}$/;
  if (!cepRegex.test(cepDestino)) {
    return res.status(400).json({ error: "CEP inválido." });
  }

  const url = "https://www.melhorenvio.com.br/api/v2/me/shipment/calculate";

  const data = {
    from: {
      postal_code: "01212-020", // CEP de origem
    },
    to: {
      postal_code: cepDestino,
    },
    package: {
      height: 15,
      width: 20,
      length: 15,
      weight: 1,
    },
  };

  try {
    const response = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${MELHOR_ENVIO_TOKEN}`,
        "Content-Type": "application/json",
        Accept: "application/json",
        "User-Agent": "Aplicação exemplo@dominio.com",
      },
    });

    // Agora, vamos filtrar os dados que queremos enviar
    const serviços = response.data.map((servico) => {
      return {
        id: servico.id,
        name: servico.name, // Nome da transportadora
        price: servico.price || servico.custom_price, // Preço
        time: servico.delivery_time || servico.custom_delivery_time, // Prazo de entrega
        company: servico.company.name, // Nome da empresa
      };
    });

    // Retorna a lista filtrada para o front-end
    res.json(serviços);
  } catch (error) {
    console.error(
      "Erro ao calcular o frete:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "Erro ao calcular o frete." });
  }
};
