import pytest

from src.domain.application import Application

def test_successfully_open_suggestions_file(tmp_path):
    fake_path = tmp_path / "suggestions.yaml"
    fake_path.write_text("suggestions:\n  - 'hello'\n  - 'hey'\n  - 'okay'")
    (tmp_path / "portfolio.yaml").write_text("some data")

    assert Application(tmp_path)._load_suggestions(fake_path)==['hello','hey','okay']

def test_fail_open_suggestions_file(tmp_path):

    with pytest.raises(FileNotFoundError):
        Application(tmp_path)

def test_less_than_3_suggestions(tmp_path):
    fake_path = tmp_path / "suggestions.yaml"
    fake_path.write_text("suggestions:\n  - 'hello'\n  - 'hey'")

    with pytest.raises(ValueError):
        Application(tmp_path)

def test_pick_3_suggestions(tmp_path):
    fake_path = tmp_path / "suggestions.yaml"
    fake_path.write_text("suggestions:\n  - 'hello'\n  - 'hey'\n  - 'okay'")
    (tmp_path / "portfolio.yaml").write_text("some data")

    assert len(Application(tmp_path).pick_random_suggestion())==3

def test_successfully_open_data_file(tmp_path):
    fake_path = tmp_path / "portfolio.yaml"
    fake_path.write_text("data:\n  - 'hello'\n  - 'hey'\n  - 'okay'")
    (tmp_path / "suggestions.yaml").write_text("suggestions:\n  - 'hello'\n  - 'hey'\n  - 'okay'")

    assert Application(tmp_path)._load_data(fake_path) != ""

def test_open_empty_data_file(tmp_path):
    fake_path = tmp_path / "portfolio.yaml"
    fake_path.write_text("")
    (tmp_path / "suggestions.yaml").write_text("suggestions:\n  - 'hello'\n  - 'hey'\n  - 'okay'")

    with pytest.raises(ValueError):
        Application(tmp_path)._load_data(fake_path)
