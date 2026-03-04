from fastapi import FastAPI

from src.domain.application import Application
from src.web.routes.chatboat import ChatBoatRoutes

class WebServer:
    def __init__ (self, application: Application) -> None:
        self._application = application
        self._app = self._build_fastapi()

    def _build_fastapi(self) -> FastAPI:
        app = FastAPI()

        chat_boat_router = ChatBoatRoutes(self._application).router()
        app.include_router(chat_boat_router, prefix="")

        return app

    def get_app(self) -> FastAPI:
        return self._app
