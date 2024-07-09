package com.tsuchiya.live;

import org.apache.ibatis.annotations.*;

import java.util.List;
import java.util.Optional;


@Mapper
public interface LiveMapper {


    @Insert("INSERT INTO live (schedule ,name ,location) VALUES (#{schedule}, #{name}, #{location})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    void insert(Live live);

    @Select("SELECT * FROM live WHERE id = #{id}")
    Optional<Live> findById(Integer id);

    @Select("SELECT * FROM live")
    List<Live> findAll();

    @Select("SELECT COUNT(*) > 0 FROM live WHERE schedule = #{schedule} AND name = #{name} AND location = #{location} AND id != #{id}")
    boolean isDuplicate(String schedule, String name, String location, Integer id); // liveのレコードの重複チェックを行うためのMyBatisのSQLクエリ

    @Update("UPDATE live SET schedule = #{schedule}, name = #{name}, location = #{location} WHERE id = #{id}")
    void update(Live live); // liveのレコードを更新するためのMyBatisのSQLクエリ

    @Delete("DELETE FROM live WHERE id = #{id}")
    void delete(Integer id); // 指定されたIDのライブデータをデータベースから削除するためのメソッド
}

