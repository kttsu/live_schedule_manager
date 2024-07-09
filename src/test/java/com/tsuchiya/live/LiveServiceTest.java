package com.tsuchiya.live;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class LiveServiceTest {

    @InjectMocks
    private LiveService liveService;

    @Mock
    private LiveMapper liveMapper;


    @Test
    public void 全てのliveを取得するテスト() {
        Live live1 = new Live(1, "2024-6-6 19:00:00", "PRAYING MANTIS", "梅田Club Quattro");
        Live live2 = new Live(2, "2024-9-24 19:00:00", "IRON MAIDEN", "大阪城ホール");
        Live live3 = new Live(3, "2024-10-19 18:00:00", "JOURNEY", "Asueアリーナ大阪");
        Live live4 = new Live(4, "2024-10-02 19:00:00", "RHAPSODY OF FIRE", "梅田クラブクアトロ");

        List<Live> expected = Arrays.asList(live1, live2, live3, live4);
        when(liveMapper.findAll()).thenReturn(expected);

        List<Live> actual = liveMapper.findAll();

        assertEquals(expected.size(), actual.size());
        assertEquals(expected, actual);
    }

    @Test
    public void idでliveを取得するテスト() {
        int existingId = 1;
        Live expectedLive = new Live(existingId, "2024-06-06 19:00:00", "PRAYING MANTIS", "梅田Club Quattro");
        when(liveMapper.findById(existingId)).thenReturn(Optional.of(expectedLive));

        Live actualLive = liveService.findById(existingId);

        assertEquals(expectedLive, actualLive);
    }

    @Test
    public void 存在しないidで例外が投げられることのテスト() {
        int nonExistingId = 6;

        when(liveMapper.findById(nonExistingId)).thenReturn(Optional.empty());

        assertThrows(LiveNotFoundException.class, () -> liveService.findById(nonExistingId));
    }

    @Test
    public void liveを登録するテスト() {
        Live liveToInsert = new Live("2024-12-06 19:00:00", "ジューダス・プリースト", "あましんアルカイックホール");

        doNothing().when(liveMapper).insert(any(Live.class));

        Live insertedLive = liveService.insert(liveToInsert.getSchedule(), liveToInsert.getName(), liveToInsert.getLocation());

        assertEquals(liveToInsert.getSchedule(), insertedLive.getSchedule());
        assertEquals(liveToInsert.getName(), insertedLive.getName());
        assertEquals(liveToInsert.getLocation(), insertedLive.getLocation());
    }

    @Test
    void liveを更新するテスト() {
        int existingId = 1;
        Live existingLive = new Live(existingId, "2024-06-06 19:00:00", "PRAYING MANTIS", "梅田Club Quattro");
        Live liveToUpdate = new Live(existingId, "2024-11-21 19:00:00", "JPクーパー", "渋谷 WWW");

        when(liveMapper.findById(existingId)).thenReturn(Optional.of(existingLive));
        when(liveMapper.isDuplicate(liveToUpdate.getSchedule(), liveToUpdate.getName(), liveToUpdate.getLocation(), existingId)).thenReturn(false);

        liveService.update(existingId, liveToUpdate.getSchedule(), liveToUpdate.getName(), liveToUpdate.getLocation());

    }

    @Test
    void 存在しないidで更新すると例外が投げられるテスト() {
        int nonExistentId = 6;
        Live liveToUpdate = new Live(nonExistentId, "2024-11-21 19:00:00", "JPクーパー", "渋谷 WWW");

        when(liveMapper.findById(nonExistentId)).thenReturn(Optional.empty());

        assertThrows(LiveNotFoundException.class, () -> liveService.update(nonExistentId, liveToUpdate.getSchedule(), liveToUpdate.getName(), liveToUpdate.getLocation()));
    }

    @Test
    void liveを削除するテスト() {
        int existingId = 1;
        Live existingLive = new Live(existingId, "2024-06-06 19:00:00", "PRAYING MANTIS", "梅田Club Quattro");

        when(liveMapper.findById(existingId)).thenReturn(Optional.of(existingLive));

        liveService.delete(existingId);
    }

    @Test
    void 存在しないidを削除すると例外が投げられるテスト() {
        int nonExistingId = 6;

        when(liveMapper.findById(nonExistingId)).thenReturn(Optional.empty());

        assertThrows(LiveNotFoundException.class, () -> {
            liveService.delete(nonExistingId);
        });
    }
}

