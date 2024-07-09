package com.tsuchiya.live;

import com.github.database.rider.core.api.dataset.DataSet;
import com.github.database.rider.core.api.dataset.ExpectedDataSet;
import com.github.database.rider.spring.api.DBRider;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@DBRider
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class LiveRestApiIntegrationTest {

    @Autowired
    MockMvc mockMvc;

    @Test
    @DataSet(value = "datasets/live.yml")
    @Transactional
    void 全てのliveを取得できること() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/live"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        [
                           {
                             "id": 1,
                             "schedule": "2024-05-09 19:00:00",
                             "name": "Yngwie J.Malmsteen",
                             "location": "zepp namba"
                           },
                           {
                             "id": 2,
                             "schedule": "2024-06-06 19:00:00",
                             "name": "PRAYING MANTIS",
                             "location": "梅田Club Quattro"
                           },
                           {
                             "id": 3,
                             "schedule": "2024-09-24 19:00:00",
                             "name": "IRON MAIDEN",
                             "location": "大阪城ホール"
                           },
                           {
                             "id": 4,
                             "schedule": "2024-10-19 18:00:00",
                             "name": "JOURNEY",
                             "location": "Asueアリーナ大阪"
                           }
                        ]
                        """
                ));
    }

    @Test
    @DataSet(value = "datasets/live.yml")
    @Transactional
    void 存在するliveのidを指定して取得できること() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/live/1"))
                .andExpect(status().isOk())
                .andExpect(content().json("""                  
                           {
                             "id": 1,
                             "schedule": "2024-05-09 19:00:00",
                             "name": "Yngwie J.Malmsteen",
                             "location": "zepp namba"
                           }
                        """
                ));
    }

    @Test
    @Transactional
    void 存在しないliveのidを指定したときに404エラーが返されること() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/live/5"))
                .andExpect(status().isNotFound())
                .andExpect(content().json("""                              
                           {
                             "message": "Live not found"
                           }
                        """
                ));
    }

    @Test
    @DataSet(value = "datasets/live.yml")
    @Transactional
    void liveを新規登録できること() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/live")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                        {
                          "schedule": "2024-12-31 20:00:00",
                          "name": "NEW TEST LIVE",
                          "location": "NEW LOCATION"
                        }
                        """));
    }

    @Test
    @DataSet(value = "datasets/live.yml")
    @ExpectedDataSet(value = "datasets/expectedLiveDataAfterUpdate.yml", ignoreCols = "id")
    @Transactional
    void 指定したidでliveの情報を更新できること() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.patch("/live/{id}", 1)
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content("""
                                {
                                  "schedule": "2024-12-31 20:00:00",
                                  "name": "NEW TEST LIVE",
                                  "location": "NEW LOCATION"
                                }
                                """))
                .andExpect(status().isOk()) // HTTPステータスコードが200であることと更新成功メッセージを確認
                .andExpect(jsonPath("$.message").value("live updated"));

        // 更新後のデータを確認するためにGETリクエストを送信
        mockMvc.perform(MockMvcRequestBuilders.get("/live/{id}", 1))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.schedule").value("2024-12-31 20:00:00"))
                .andExpect(jsonPath("$.name").value("NEW TEST LIVE"))
                .andExpect(jsonPath("$.location").value("NEW LOCATION"));
    }


    @Test
    @DataSet(value = "datasets/live.yml")
    @Transactional
    void 重複したデータでliveを更新する場合に400を返すこと() throws Exception {
        MockHttpServletResponse response = mockMvc.perform(MockMvcRequestBuilders.patch("/live/2")
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content("""
                                {
                                  "schedule": "2024-05-09 19:00:00",
                                  "name": "Yngwie J.Malmsteen",
                                  "location": "zepp namba"
                                }
                                """))
                .andExpect(status().isBadRequest())
                .andReturn().getResponse();

        // レスポンスの内容を文字列として取得し,エラーメッセージが含まれていることを確認
        String jsonResponse = response.getContentAsString();
        assertTrue(jsonResponse.contains("Cannot update with the same data"));
    }


    @Test
    @DataSet(value = "datasets/live.yml")
    @Transactional
    void 存在しないidでliveを更新したときに404を返すこと() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.patch("/live/5")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "schedule": "2024-12-31 20:00:00",
                                  "name": "NEW TEST LIVE",
                                  "location": "NEW LOCATION"
                                }
                                """))
                .andExpect(status().isNotFound());
    }

    @Test
    @DataSet(value = "datasets/live.yml")
    @ExpectedDataSet(value = "datasets/expectedLiveDataAfterDelete.yml", ignoreCols = "id")
    @Transactional
    void 指定したidのliveがDBから削除されメッセージが返ること() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.delete("/live/1"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("""
                        {
                          "message": "live deleted"
                        }
                        """));

        mockMvc.perform(MockMvcRequestBuilders.get("/live/1"))
                .andExpect(MockMvcResultMatchers.status().isNotFound());
    }

    @Test
    @DataSet(value = "datasets/live.yml")
    @Transactional
    void 存在しないliveのidを削除したとき404とメッセージを返すこと() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.delete("/live/6"))
                .andExpect(MockMvcResultMatchers.status().isNotFound())
                .andExpect(MockMvcResultMatchers.content().json("""
                        {
                          "message": "That live id cannot be deleted"
                        }
                        """));
    }
}

